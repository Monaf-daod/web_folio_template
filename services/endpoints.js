export const baseUri = process.env.NEXT_PUBLIC_BACK_END_PUBLIC_PATH;
export const baseUris = process.env.NEXT_PUBLIC_BACK_END_PUBLIC_PATH_SECONDARY;
export const GET_HOME_INFO = `${baseUri}/web/home`;
export const GET_THEME = `${baseUris}/web/GlobalTheme`;
export const GET_GALLERY = `${baseUri}/web/gallery`;
export const GET_NEWS = (pageCount, pageSize) =>
  `${baseUri}/web/news?PageNumber=${pageCount}&PageSize=${pageSize}`;
export const GET_CONTACT = `${baseUri}/web/AboutUs/contact-us`;
export const GET_PROJECTS = (pageCount, pageSize) =>
  `${baseUri}/web/project?PageNumber=${pageCount}&PageSize=${pageSize}`;
export const GET_SERVICES = (pageCount, pageSize) =>
  `${baseUri}/web/service?PageNumber=${pageCount}&PageSize=${pageSize}`;
export const GET_NEWS_DETAILS = (id) => `${baseUri}/web/News/${id}`;
export const GET_TEAM = `${baseUri}/web/AboutUs/our-team`;
export const FOOTER = `${baseUris}/web/footer`;
export const PROJECT_DETAIL = (id) => `${baseUri}/web/project/${id}`;
export const SERVICE_DETAILS = (id) => `${baseUri}/web/SubService/${id}`;
export const AboutUS = `${baseUri}/web/aboutUs/details`;
export const SubServicesAPI = (id, pageCount, pageSize) =>
  `${baseUri}/web/service/${id}/sub-services?PageNumber=${pageCount}&PageSize=${pageSize}`;
export const PostFooterSubscribe = `${baseUris}/web/about-us/subscriber`;
export const PostSendEmail = `${baseUris}/web/about-us/contact-us/sendEmail`;
export const GETFAQ = `${baseUri}/web/Faq`;
export const GET_DYNAMIC_PAGE = (slug) => `${baseUri}/web/Page/${slug}`;
export const POST_NEW_USER = `${baseUris}/web/Account/Register`;
export const POST_CONFORM = `${baseUris}/Web/Account/ConfirmAccount`;
export const FORGET_PASSWORD = `${baseUris}/Web/Account/ForgetPassword`;
export const LOGIN = `${baseUris}/web/Account/Login`;
export const RESENDCODE = `${baseUris}/web/Account/ResendCode`;
export const CHECKFORGETCODE = `${baseUris}/Web/Account/CheckCode`;
export const POSTNEWPASSWORD = `${baseUris}/Web/Account/ConfirmForgetPassword`;
