const errorMiddleware = async (next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
};

export { errorMiddleware };
