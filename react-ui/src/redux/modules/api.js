export const apiEndpoint = {
  tokenGenerate: () => `/token/generate`,
  authFirebase: id => (id ? `/auth/firebase/${id}` : `/auth/firebase`),
  login: () => `/auth/login`,
  users: id => (id ? `/users/${id}` : `/users`),
  userSpaces: id => `/users/${id}/spaces`,
  userSpaceAccessLog: id => `users/${id}/spaces/log`,
  addUserSpaceAccessLog: (userId, spaceId) => `users/${userId}/spaces/${spaceId}`,
  spaces: id => (id ? `/spaces/${id}` : `/spaces`),
  spaceImage: (spaceId, imageId) =>
    imageId ? `/spaces/${spaceId}/image/${imageId}` : `/spaces/${spaceId}/image`,
  requests: id => (id ? `/requests/${id}` : `/requests`),
  requestsByUserId: id => `/requests/user/${id}`,
  requestsByHostUserId: id => `/requests/host/${id}`,
  payments: id => (id ? `/payments/${id}` : `/payments`),
  sendMail: () => `/mailer/send`,
  sales: () => `/payments/payouts`,
  backlogAddIssue: () => `/backlog/issue`,
  features: id => `spaces/features/${id}`,
};

export default apiEndpoint;
