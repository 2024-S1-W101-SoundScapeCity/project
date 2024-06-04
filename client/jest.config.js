module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue3-jest',
      '^.+\\.js$': 'babel-jest',
      '.*\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|woff|woff2|ttf|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    snapshotSerializers: ['jest-serializer-vue'],
    testEnvironment: "./jest.environment.js",
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },
  };  