export const load = async ({ params }) => {
  // Validate that the course slug exists
  const validCourses = ['shadowwork', 'limiting-beliefs', 'relationships'];
  
  if (!validCourses.includes(params.slug)) {
    return {
      notFound: true
    };
  }
  
  return {
    slug: params.slug
  };
};
