#API Org App
AUTHOR: Zak B. Elep <zak.elep@yoyo-holdings.com>

API Org App is [[https://github.com/yoyo-holdings][YOYO]]'s technical test.  This is a standard web
application that provides a simple organizer for the user to store notes
and TODOs.

![My Image](https://raw.githubusercontent.com/johndavedecano/api-org-app/master/screenshot.png)

##Technology Stack

1. NodeJS
2. ReactJS + Redux
3. ExpressJS
4. MongoDB
5. WebPack

##Installation
  1. Clone repository git clone https://github.com/johndavedecano/api-org-app.git
  2. Configure your mongoDB database URI and credentials at config.js.

```
      # Install npm packages
      npm install
      # Build Application
      npm run build-production
      # Fire up the server
      npm start
```
##Instructions

  1. Fork this repository on your own personal GitHub account.
  2. Download your fork, build this app, and begin making changes.
  3. When finished, create a Pull Request to merge into YOYO's version,
     then send an email to ```https://github.com/zakame``` ```@zakame``` to let him know you're ready for
     review.
  4. We will close the pull request.

  You may also submit your commits using =git format-patch=, should you
  prefer it over GitHub PRs.

##Specifications

  1. The app consists of two major activities:
     - a note-taking activity that accepts a =title= and =text= for one
       or more notes
     - a TODO tracking activity that accepts an =entry=, with a
       =checkbox= to show whether this entry has been done or not done
  2. The app primarily exports a RESTful Web API that can be a backend
     for one or more SPAs corresponding to the activities above.
  3. The app should have a user interface that allows for easy access
     between the note-taking and TODO tracking activities as well as to
     see their details at a glance.
  4. The note-taking activity should provide a view for its notes in a
     reverse-chronological order, with options for updating and deleting
     old notes.
  5. The TODO-tracking activity should provide a view for its entries
     with options for updating and deleting old TODOs.
  6. The app should make it easy to switch between the note-taking and
     TODO-tracking activities.
  7. The app should make it easy to switch a note to a TODO entry, and
     vice versa.
  8. The web app's UI should be accessible at ```http://localhost:3000```,
     while its API should be at ```http://localhost:3000/api```.

##Notes

  - While our preference is Perl and JavaScript, you may use any
    scripting language you are comfortable with in completing this test,
    provided you supply appropriate documentation; the level of
    verbosity is at your discretion.
  - You may use any open source libraries that you think would be useful
    for completing the test and improving this app.
  - You may implement the user interface in any way that you feel may
    improve the user experience.
  - You may use any development tools you have at your disposal to
    complete this test, so long as the resulting app is a standard web
    application that can be deployed using the standard tooling:

```
      # assuming Perl on Mojolicious app in myapp.pl
      ./myapp.pl daemon

      # assuming NodeJS
      npm start

      # assuming Ruby on Rails
      rails server
```
