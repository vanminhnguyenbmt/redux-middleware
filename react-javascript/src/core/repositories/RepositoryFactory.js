import * as CONST from 'src/core/utils/constants';
import HomeRepository from 'src/core/repositories/Home.repository';

const repositories = {
    [CONST.RepositoryName.HOME]: new HomeRepository()
};

export default {
    get: (name) => repositories[name]
};
