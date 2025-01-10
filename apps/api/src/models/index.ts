import { EntitySchema, MixedList } from 'typeorm';
import { User } from './user.model';
import { RefreshToken } from './refresh-token.model';

// Bootstrap entities for database models
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const entities: MixedList<string | Function | EntitySchema<any>> | undefined = [RefreshToken, User];

export { entities, RefreshToken, User };
