var React = require('react');
var KeyStore = require('../stores/key_store');

var Track = require('../util/track.js');

var Recorder = React.createClass({

  getInitialState: function() {
      return {recording: false, track: new Track({name: "Record"})};
  },

  isDoneRecording: function() {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording: function() {
    return this.state.recording;
  },

  isTrackNew: function() {
    return this.state.track.isBlank();
  },

  playClass: function() {
    return "play-button" + this.isTrackNew() ? "" : " disabled";
  },

  componentDidMount: function() {
    this.listener = keyStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  _onChange: function() {
    if (this.state.isRecording) {
      this.state.track.addNotes(KeyStore.keys());
    }
  },

  playTrack: function() {
    if(!this.isTrackNew()) {
        this.state.track.play();
    }
  },

  recordingMessage: function() {
    if(this.isRecording()) {
      return "Stop!";
    } else if (this.isDoneRecording()) {
      return "Finished!";
    } else {
      return "Begin!"
    }
  },

  recordClick: function() {
    if (this.state.recording) {
      /** Complete recording is */
      this.state.track.completeRecording();
      this.setState({recording: false});
    } else {
      this.setState({recording: true});
      this.state.track.startRecording();
    }
  },

  render: function() {
    var hasTrack = this.isTrackNew();
    return (
      <div className="controls">
        <h1>Recorder!</h1>
        <button onClick={this.recordClick} className="record-button">{this.recordingMessage()}</button>
        <button onClick={this.playClick} className={this.playClass()}>Play</button>
      </div>
    );
  }
});

module.exports = Recorder;
