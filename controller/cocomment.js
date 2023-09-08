const { cocomment, post, comment } = require("../models");

//대댓글 생성
const createCocomment = async (req, res) => {
  const { postID } = req.params;
  const { commentID } = req.headers;
  const { content } = req.body;
  const user = req.decoded;

  try {
    const thisPost = await post.findOne({
      where: { postID },
    });

    if (!thisPost) {
      return res.status(404).json({
        message: "찾을 수 없는 게시물",
      });
    }

    const thisComment = await comment.findOne({
      where: { commentID },
    });

    if (!thisComment) {
      return res.status(404).json({
        message: "찾을 수 없는 댓글",
      });
    }

    await cocomment.create({
      commentID,
      postID,
      userID: user.userID,
      content,
      writer: user.userName,
    });

    return res.status(201).json({
      message: "요청 성공",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "요청 실패",
    });
  }
};

//대댓글 업뎃
const updateCocomment = async (req, res) => {
  const { cocommentID } = req.params;
  const { content } = req.body;

  try {
    const thisCocomment = await cocomment.findOne({
      where: { cocommentID },
    });

    if (!thisCocomment) {
      return res.status(404).json({
        message: "찾을 수 없는 대댓글",
      });
    }

    await thisCocomment.update({
      content,
    });

    return res.status(200).json({
      message: "요청 성공",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "요청 실패",
    });
  }
};

//대댓글 삭제
const deleteCocomment = async (req, res) => {
  const { cocomentID } = req.params;

  try {
    const thisCocomment = await cocomment.findOne({
      where: { cocomentID },
    });

    if (!thisCocomment) {
      return res.status(404).json({
        message: "대댓글을 찾을 수 없음",
      });
    }

    await cocomment.destroy({
      where: { thisCocomment },
    });

    return res.status(204).json({});
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "요청실패",
    });
  }
};

//대댓글 목록조회
const getCocommentList = async (req, res) => {
  const { postID } = req.params;

  try {
    const cocomments = await cocomment.findAll({
      where: { postID },
    });

    return res.status(200).json({
      message: "요청 성공",
      cocomments,
    });
  } catch (err) {
    console.error({
      message: "요청 실패",
    });
  }
};

module.exports = {
  createCocomment,
  updateCocomment,
  deleteCocomment,
  getCocommentList,
};
