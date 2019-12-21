import router from '../router'

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
