// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import Cloudinary from '../components/CloudinaryIcon';

type Props = {};

export default class CloudinaryUpload extends Component<Props> {
	props: Props;

	render() {
		return <Cloudinary />;
	}
}
