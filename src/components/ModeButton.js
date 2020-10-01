import React, { Component } from 'react'

class ModeButton extends Component {
    callhandleModeChange = () => {
        if (this.props.extra === "") {
            this.props.handleModeChange();
        }
    }
    render() {
        if (this.props.isDark) {
            return (<React.Fragment><span className="change-theme">Theme</span><div disabled onClick={this.callhandleModeChange} className="parent-mode-div"><div ref={this.modeRef} className="child-mode-div" ></div></div></React.Fragment>)
        }
        else {
            return (<React.Fragment><span className="change-theme">Theme</span><div disabled onClick={this.callhandleModeChange} className="parent-mode-div-light"><div ref={this.modeRef} className="child-mode-div-light" ></div></div></React.Fragment>)
        }
    }
}

export default ModeButton;