import { RepositoryBase } from './RepositoryBase';

import { IUser } from '../interfaces/IUser';
import { ISearchModel } from '../interfaces/ISearchModel';
import { UserSet } from '../schemas/UserSchema';
import { SearchModelSet } from '../schemas/searchModelSchema';

/** 
 * Middleware for users in database interaction
*/
export class UserRepository extends RepositoryBase<IUser> {
  constructor() {
    super(UserSet);
  };
};

/** 
 * Middleware for users in database interaction
*/
export class SearchModelRepository extends RepositoryBase<ISearchModel> {
  constructor() {
    super(SearchModelSet);
  };
};