import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

import './Css/Markdown.css';
 
import MarkdownEditor from './Components/MarkdownEditor.js';

const node = document.getElementById("root");

var instanciaThis = this;
render(<MarkdownEditor />, node);
