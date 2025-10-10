const load = async ({ params }) => {
  const validCourses = ["shadowwork", "limiting-beliefs", "relationships"];
  if (!validCourses.includes(params.slug)) {
    return {
      notFound: true
    };
  }
  return {
    slug: params.slug
  };
};
export {
  load
};
