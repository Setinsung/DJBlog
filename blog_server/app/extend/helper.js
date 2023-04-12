const dayjs = require('dayjs');
exports.relativeTime = time => dayjs(new Date(time)).format('YYYY-MM-DD HH:mm;ss');
