module.exports = {
  // 更新审核状态
  updateAuditStatusRequest: {
    auditStatus: {
      type: 'string',
      required: true,
      description: '审核状态',
      example: '1',
    },
  },
};
