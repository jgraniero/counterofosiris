# Counter of Osiris

Wrote this for use with OBS / Twitch for fun.  It's a quick way to put a trials counter on your stream.  Even if you don't have any followers and just stream in order to save your gameplay to Twitch so you can review later, this helps give some context about the match.

## How To Use

This project is still rough around the edges, so getting it up and running is a bit hacky, but here we go.

What you have here is basically a website.  If you want to go ahead and setup a public server to host this on, by all means go for it, but for me that's overkill as I don't have anyone watching my stream. Here's how I'm currently using it.

### Download node.js

You can download node from [nodejs.org](https://nodejs.org).  This should just be a simple wizard you click through.

### Build the server

In order to get the server up and running, clone this repo using Github's convenient "Clone or download" button on the top right of this page.

To build the server, you'll have to open up a command prompt / shell / terminal / whatever you want to call it and `cd` to the rood directory of this project and run

```bash
$ npm install
```

The `npm` command was installed when you installed node in the previous step.  `npm install` is going to pull down all of the dependencies for this project.

To actually build the code, you'll want to run:

```bash
$ gulp build --production
```

I'll clean up the `--production` thing at some point.  This is just a common pattern that I use for real node projects and so was easy to take that boilerplate and not really have to think about this.  In fact everything will still work without issue if you just run

```bash
$ gulp build
```

### Running the server

The build steps in the previous section only have to be run once.  So if you get everything working, shut your computer down, come back a week later and want to start this up again, you should skip right to this section.  No need to build everything again.

To run the server:

```bash
$ npm server.js
````

You should see a message that says your server is now listening on port 9005.

You can check that everything is working by opening a browser and going to `http://localhost:9005/trialscard`.  You should see a giant f*cking trials card on your screen.  If you got that working, you're ready for the next step.

### "Hosting"

Ok, so we're not really going to host this because like I said, that's more work and money than I think this is worth for me.

I use an application called ngrok.  You can download it from [ngrok.com](https://ngrok.com/download).  Follow the instructions for downloading.

What you want to do is map the local server you started on port 9005 to a publicly available url.  Open ngrok and run

```bash
$ ngrok http 9005
```

You'll see some output, the most important of which is a line that reads something like `Forwarding http://randomgarbagetext.ngrok.io -> localhost:9005`.  So now if you open your browser and go to `http://randomgarbagetext.ngrok.io/trialscard` you should see the giant trials card again.  Better yet, _anyone_ you send the link to will be able to see the same thing as this url is now publicly available.

### Making the counter count

Now that you have a working server, you'll want to setup some quick commands.  I do this via [nightbot](https://beta.nightbot.tv/).  Open your nightbot settings and in custom commands, input the following (note that the urls here are the ngrok urls from above):

| Command | Message | Userlevel |
| ------- | ------- | --------- |
| !loss   | `$(urlfetch http://randomgarbagetext.ngrok.io/trialscard/loss)` | owner |
| !mercy  | `$(urlfetch http://randomgarbagetext.ngrok.io/trialscard/mercy)` | owner | 
| !reset  | `$(urlfetch http://randomgarbagetext.ngrok.io/trialscard/reset)` | owner |
| !win    | `$(urlfetch http://randomgarbagetext.ngrok.io/trialscard/win)` | owner |

### Adding the Trials Counter to your stream

Last but not least, you'll want to add this to your stream.

Grab the [browsersource](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/) plugin for OBS (if you use obs.  If not, figure out how to capture a browser window).

Open the browsersource settings and input the correct information to capture the browser window you have open showing your trials card. That's it!
