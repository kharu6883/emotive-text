import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import './launch.css';

const emojiArray = ["😁","🥰","😥","😅","🤣","😜","😤"];

class launch extends Component {
  constructor() {
    super();
    this.state = { textIdx: 0 };
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 2000);
  }

  componentDidUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    let textThatChanges = emojiArray[this.state.textIdx % emojiArray.length];
    document.body.style = 'background: #33673b;';
    return (
      <section className="grid-container">
        <div className="head">
          <div className="title">
            Emotive Writing
            <text className="emoji">  {textThatChanges}</text>
          </div>
        </div>


        <div className="content">
          <div className="inner-content">
            <img className="images" src="D:\Documents\GitHub\emotive-text\client\src\component\launch\walking.gif"/>

            <div className="user-input">
              <Button
                href="/recording"
                className="startCallBtn"
                variant="primary"
              > 
              Start a call
              </Button>

              <form className="code">
                <input
                  className="code-input"
                  placeholder="Enter code"
                ></input>
                <Button
                  type="submit"
                  value="submit"
                  className="submitBtn"
                  variant="primary"
                >
                  Submit
                </Button>
				      </form>
            </div>



          </div>
        </div>  
      </section>
    )
  }
}

export default launch;