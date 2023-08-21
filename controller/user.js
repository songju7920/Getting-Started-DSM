const { user } = require("../models");
const { post } = require("../models");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//로그인 화면으로 이동(구현 완료)
const moveToLogIn = async (req, res) => {
  return res.render("../views/users/logIn", { message: "" });
};

//회원가입 화면으로 이동(구현 완료)
const moveToSignUp = async (req, res) => {
  return res.render("../views/users/signUp");
};

//회원탈퇴 화면으로 이동(구현 완료)
const moveToWithdrawal = async (req, res) => {
  return res.render("../views/users/withdrawal");
};

//비번 변경 화면으로 이동(구현 완료)
const moveToChangePW = async (req, res) => {
  return res.render("../views/users/changePW");
};

//회원가입(구현 완료)
const signUp = async (req, res) => {
  const { userName, password, email } = req.body;

  try {
    //이메일 중복 확인
    const thisUser = await user.findOne({
      where: { email },
    });
    if (thisUser) {
      return res.status(409).json({
        massage: "이미 가입된 이메일입니다.",
      });
    }

    //비번 암호화
    const salt = crypto.randomBytes(32).toString("hex");
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 2, 32, "sha512")
      .toString("hex");

    await user.create({
      userName,
      password: hashPassword,
      email,
      salt,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//회원 탈퇴(구현 완료)
const signOut = async (req, res) => {
  const { userID } = req.decoded;
  const { password } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userID },
    });

    if (!thisUser) {
      return res.status(404).json({
        massage: "유저를 찾을수 없습니다.",
      });
    }

    const userPw = crypto
      .pbkdf2Sync(password, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (userPw != thisUser.password) {
      return res.status(403).json({
        massage: "비밀번호가 맞지 않음",
      });
    }

    const posts = await post.findAll({
      where: { userID },
    });

    await Promise.all(
      posts.map(async (post) => {
        await post.destroy();
      })
    );

    await user.destroy({
      where: { userID },
    });

    return res.clearCookie("access_token").redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//로그인(구현 완료)
const logIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userName },
    });

    if (!thisUser) {
      return res.render("../views/users/logIn", {
        message: "닉네임을 확인해주세요",
      });
    }

    const userPw = crypto
      .pbkdf2Sync(password, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (thisUser.password != userPw) {
      return res.render("../views/users/logIn", {
        message: "비밀번호를 확인해주세요",
      });
    }

    const key = process.env.KEY;

    const token = jwt.sign(
      {
        userID: thisUser.userID,
        userName: thisUser.userName,
        email: thisUser.email,
      },
      key,
      {
        expiresIn: "1h",
      }
    );

    await thisUser.update({
      token,
    });

    req.session.access_token = token;

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다?",
    });
  }
};

//로그아웃(구현 완료)
const logOut = async (req, res) => {
  const { userID } = req.decoded;

  try {
    const thisUser = await user.findOne({
      where: { userID },
    });

    if (!thisUser) {
      return res.status(404).json({
        massage: "존재하지 않는 유저",
      });
    }

    await thisUser.update({
      token: null,
    });

    req.session.destroy();

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//회원 정보 보기(구현 완료)
const getUserInfo = async (req, res) => {
  const cookieUser = req.decoded;
  const userID = req.params.userID;

  try {
    const thisUser = await user.findOne({
      where: { userID },
    });

    return res.render("../views/users/profile", {
      user: thisUser,
      cookieUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: "요청에 실패했습니다.",
    });
  }
};

//비번 수정(확인 완료)
const changePW = async (req, res) => {
  const { userID } = req.decoded;
  const { password, newPassword } = req.body;

  try {
    const thisUser = await user.findOne({
      where: { userID },
    });

    if (!thisUser) {
      return res.status(404).json({
        massage: "존재하지 않는 유저",
      });
    }

    const userPW = crypto
      .pbkdf2Sync(password, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (thisUser.password != userPW) {
      return res.status(403).json({
        massage: "비밀번호가 일치안함",
      });
    }

    const newUserPW = crypto
      .pbkdf2Sync(newPassword, thisUser.salt, 2, 32, "sha512")
      .toString("hex");

    if (thisUser.password == newUserPW) {
      return res.status(403).json({
        massage: "현재 비밀번호로는 변경이 불가능합니다",
      });
    }

    await thisUser.update({
      password: newUserPW,
    });

    return res.status(200).json({
      massage: "요청에 성공했습니다",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

module.exports = {
  moveToLogIn,
  moveToSignUp,
  moveToWithdrawal,
  moveToChangePW,
  signUp,
  getUserInfo,
  signOut,
  logIn,
  logOut,
  changePW,
};
