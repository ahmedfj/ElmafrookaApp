import React, { Component } from 'react'
import './App.scss'
import {Route} from 'react-router-dom'

//Auth
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import Footer from './footer/Footer'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import AdminHomepage from './elmafrookahApp/components/adminpage/AdminHomepage'

//Admin
import CreatePost from './elmafrookahApp/components/adminpage/CreatePost'
import ShowPost from './elmafrookahApp/components/adminpage/ShowPost'
import EditPost from './elmafrookahApp/components/adminpage/EditPost'
import Home from './elmafrookahApp/Home'

//published
import ShowPublicPost from './elmafrookahApp/pages/ShowPublicPost'
import InterviewsPosts from './elmafrookahApp/components/adminpage/InterviewsPosts'
import ReviewsPosts from './elmafrookahApp/components/adminpage/ReviewsPosts '
import LongInterviewsPage from './elmafrookahApp/pages/LongInterviewsPage'
import FeaturePage from './elmafrookahApp/pages/FeaturePage'
import ReviewsPage from './elmafrookahApp/pages/ReviewsPage'
import SearchPage from './elmafrookahApp/pages/SearchPage'
import ProfilePage from './elmafrookahApp/pages/ProfilePage'
import ProfilePosts from './elmafrookahApp/components/adminpage/ProfilePosts'





class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
   
    }
  }



  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )}/>

          <AuthenticatedRoute exact path="/dashboard" user={user}  render={() => (
            <AdminHomepage user={user}/>
          )}/>
           <AuthenticatedRoute exact path="/create/post" user={user}  render={() => (
             <CreatePost user={user} />
           )}/>
            <AuthenticatedRoute
            exact
            path="/post/:id"
            user={user}
            render={props => (
              <ShowPost user={user} postId={props.match.params.id} />
            )}
          />
            <AuthenticatedRoute exact path="/interviews/posts"  user={user} render={(props) => (
             <InterviewsPosts user={user}/>
          )} />
            <AuthenticatedRoute exact path="/reviews/posts"  user={user} render={(props) => (
             <ReviewsPosts user={user}/>
          )} />
            <AuthenticatedRoute exact path="/profile/posts"  user={user} render={(props) => (
             <ProfilePosts user={user}/>
          )} />
            <AuthenticatedRoute
            exact
            path="/post/edit/:id"
            user={user}
            render={props => (
              <EditPost user={user} postId={props.match.params.id}/>
            )}
          />
           <Route exact path='/' render={() => (
             <Home/>
          )} />
             <Route exact path='/long-interviews' render={() => (
             <LongInterviewsPage/>
          )} />
             <Route exact path='/feature' render={() => (
             <FeaturePage/>
          )} />
           <Route exact path='/reviews' render={() => (
             <ReviewsPage/>
          )} />
           <Route exact path='/profile' render={() => (
             <ProfilePage/>
          )} />
           <Route exact path='/posts/:id/:name' render={(props) => (
             <ShowPublicPost user={user} name={props.match.params.name} postId={props.match.params.id}/>
          )} />
          <Route exact path='/search/:id' render={(props) => (
            <SearchPage id={props.match.params.id}/>
          )} />
        </main>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default App
