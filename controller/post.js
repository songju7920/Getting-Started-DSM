const { post } = require("../models");
const { Op } = require("sequelize");

//화면이동
//글 등록 화면으로 이동 (구현 완료)
const moveToCreatePost = async (req, res) => {
  const user = req.decoded;
  return res.render("../views/board/createBoard", { user });
};

//글 수정 화면으로 이동 (구현 완료)
const moveToUpdatePost = async (req, res) => {
  const postID = req.params.postID;
  try {
    const thisPost = await post.findOne({
      where: { postID },
    });

    if (!thisPost) {
      return res.status(404).json({
        message: "게시글을 찾을수 없습니다.",
      });
    }

    return res.render("../views/board/updateBoard", { post: thisPost });
  } catch (err) {
    return res.status(400).json({
      massage: "요청에 실패했습니다.",
    });
  }
};

//CRUD
//글 등록 (구현 완료)
const createPost = async (req, res) => {
  const user = req.decoded;
  const { title, content } = req.body;

  try {
    await post.create({
      userID: user.userID,
      writer: user.userName,
      title,
      content,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//글 상세 조회 (구현 완료)
const getPost = async (req, res) => {
  const postID = req.params.postID;
  const user = req.decoded;

  try {
    const thisPost = await post.findOne({
      where: { postID },
    });

    if (!thisPost) {
      return res.status(404).json({
        massage: "게시글을 찾을수 없습니다.",
      });
    }

    return res.render("../views/board/getboard", { post: thisPost, user });
  } catch (err) {
    return res.status(400).json({
      massage: "요청에 실패했습니다.",
    });
  }
};

//글 목록 조회 (구현 완료)
const getPostList = async (req, res) => {
  const { keyword } = req.query;

  try {
    const posts = await post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    return res.render("board/index", { keyword, posts });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//글 업데이트 (구현 완료)
const updatePost = async (req, res) => {
  const user = req.decoded;
  const { title, content } = req.body;
  const postID = req.params.postID;

  try {
    const thisPost = await post.findOne({
      where: { postID },
    });

    if (user.userID != thisPost.userID) {
      return res.status(403).json({
        massage: "권한이 없는 유저",
      });
    }

    await thisPost.update({
      title,
      content,
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

//글 삭제 (구현 완료)
const deletePost = async (req, res) => {
  const postID = req.params.postID;
  const user = req.decoded;

  try {
    const thisPost = await post.findOne({
      where: { postID },
    });

    if (!thisPost) {
      return res.status(404).json({
        massage: "게시물을 찾을수 없습니다.",
      });
    }

    if (user.userID != thisPost.userID) {
      return res.status(403).json({
        massage: "권한이 없는 유저",
      });
    }

    await post.destroy({
      where: { postID },
    });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      massage: "요청에 실패했습니다",
    });
  }
};

module.exports = {
  moveToCreatePost,
  moveToUpdatePost,
  createPost,
  getPost,
  getPostList,
  updatePost,
  deletePost,
};
