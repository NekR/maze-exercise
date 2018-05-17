import worker from 'workerize-loader!worker';

const { apiQuery } = worker();

export { apiQuery };