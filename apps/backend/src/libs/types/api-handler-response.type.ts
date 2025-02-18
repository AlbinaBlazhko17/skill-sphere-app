import type { HttpCode, ValueOf } from '@skill-sphere/shared';

type APIHandlerResponse = {
  payload: unknown;
  status: ValueOf<typeof HttpCode>;
};

export { type APIHandlerResponse };
