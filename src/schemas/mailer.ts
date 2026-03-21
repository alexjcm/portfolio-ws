export const sendMailSchema = {
  body: {
    type: 'object',
    required: ['name', 'to', 'message'],
    properties: {
      name: { type: 'string' },
      to: { type: 'string', format: 'email' },
      message: { type: 'string' },
    },
  },
};
