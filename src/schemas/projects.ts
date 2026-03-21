export const projectSchemaProps = {
  name: { type: 'string', maxLength: 64 },
  description: { type: 'string', maxLength: 255 },
  status: { type: 'boolean' },
  projectLink: { type: 'string', maxLength: 255 },
  imageProjectLink: { type: 'string', maxLength: 255 },
};

export const createProjectSchema = {
  body: {
    type: 'object',
    required: ['name', 'description', 'status'],
    properties: projectSchemaProps,
  },
};

export const updateProjectSchema = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
      ...projectSchemaProps,
    },
  },
};

export const getProjectSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }, // Params are often strings in Fastify by default
    },
  },
};
