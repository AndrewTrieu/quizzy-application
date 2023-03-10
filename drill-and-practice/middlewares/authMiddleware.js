const restrictedPaths = ["/quiz", "/topics"];

const authMiddleware = async (state, next) => {
  const user = await state.session.get("user");

  if (
    !user &&
    restrictedPaths.some((path) =>
      context.request.url.pathname.startsWith(path)
    )
  ) {
    context.response.redirect("/auth/login");
  } else {
    await next();
  }
};

export { authMiddleware };
