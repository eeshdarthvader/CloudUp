// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Line } from 'rc-progress';
import CloudinaryIcon from './CloudinaryIcon';
import Cloudinary from './Cloudinary';
import CloudinaryConfig from '../utils/cloudinaryAccount';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
	props: Props;

	render() {
		return <Cloudinary />;
	}
}
