import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
// import ../style
// Progress bar set up 
NProgress.configure({
  minimum: 0.4,
  easing: 'ease',
  speed: 800,
  showSpinner: true,
});

export default NProgress;
