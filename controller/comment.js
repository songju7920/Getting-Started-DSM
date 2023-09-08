const { comment } = require("../models");

//댓글 생성
const createComment = async (req, res) => {
  const { postID } = req.params;
  const { content } = req.body;
  const user = req.decoded;

  try {
    await comment.create({
      userID: user.userID,
      postID,
      content,
      writer: user.userName,
    });

    return res.status(201).json({
      message: "요청 성공",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "요청에 실패했습니다.",
    });
  }
};

//댓글 업뎃
const updateComment = async (req, res) => {
  const { content } = req.body;
  const { commentID } = req.params;

  try {
    const thisComment = await comment.findOne({
      where: { commentID },
    });

    if (!thisComment) {
      return res.status(404).json({
        message: "게시물을 찾을 수 없음",
      });
    }

    await thisComment.update({
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

//댓글 삭제
const deleteComment = async (req, res) => {
  const { commentID } = req.params;

  try {
    const thisComment = await comment.findOne({
      where: { commentID },
    });

    if (!thisComment) {
      return res.status(404).json({
        message: "댓글을 찾을 수 없음",
      });
    }

    await thisComment.destroy({
      where: { thisComment },
    });

    return res.status(204).json({});
  } catch (err) {
    return res.status(400).json({
      message: "요청 실패",
    });
  }
};

//댓글 목록조회
const getCommentList = async (req, res) => {
  const { postID } = req.params;

  try {
    const comments = await comment.findAll({
      where: { postID },
    });

    return res.status(200).json({
      message: "요청 성공",
      comments,
    });
  } catch (err) {
    return res.status(400).json({
      message: "요청 실패",
    });
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentList,
};
