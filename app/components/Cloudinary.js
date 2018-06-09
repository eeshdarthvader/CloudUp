// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Alert, Input } from 'reactstrap';
import { Line } from 'rc-progress';
import CloudinaryIcon from './CloudinaryIcon';
import CloudinaryConfig from '../utils/cloudinaryAccount';
import styles from './Home.css';

type Props = {};

export default class Cloudinary extends Component<Props> {
	constructor() {
		super();
		this.state = {
			files: [],
			percent: 0,
			color: '#3FC7FA',
			error: '',
			upload_preset: '',
			api_key: '',
			folderPath: ''
		};
	}

	props: Props;

	handleDrop = (files) => {
		const context = this;

		context.setState({ percent: 0 });

		// Push all the axios request promise into a single array
		const uploaders = files.map((file) => {
			// Initial FormData
			const formData = new FormData();
			const uploadPreset = context.state.upload_preset || CloudinaryConfig.upload_preset;
			const apiKey = context.state.api_key || CloudinaryConfig.api_key;
			formData.append('file', file);
			formData.append('tags', `cleartrip, medium, gist`);
			formData.append('folder', context.state.folderPath);
			formData.append('upload_preset', uploadPreset); // Replace the preset name with your own
			formData.append('api_key', apiKey); // Replace API key with your own Cloudinary key
			formData.append('timestamp', (Date.now() / 1000) | 0);

			const config = {
				headers: { 'X-Requested-With': 'XMLHttpRequest' },
				onUploadProgress: (progressEvent) => {
					const colorMap = [ '#3FC7FA', '#85D262', '#FE8C6A' ];

					var percent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
					if (percent >= 100) {
						context.setState({
							percent: 100,
							color: '#3FC7FA'
						});
					} else {
						context.setState({
							percent,
							color: colorMap[parseInt(Math.random() * 3, 10)]
						});
					}
				}
			};

			// Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
			return axios
				.post('https://api.cloudinary.com/v1_1/cleartrip/image/upload', formData, config)
				.then((response) => {
					const data = response.data;
					const fileURL = data.secure_url; // You should store this URL for future references in your app
					console.log(data);

					this.setState({
						files,
						percent: 0
					});

					setTimeout(() => {
						context.setState({
							files: []
						});
					}, 5000);
				})
				.catch(function(error) {
					console.log(error.response.data.error);

					context.setState({ percent: 0, error: error.response.data.error.message });

					setTimeout(() => {
						context.setState({
							error: ''
						});
					}, 5000);
				});
		});

		// Once all the files are uploaded
		axios.all(uploaders).then(() => {
			// ... perform after upload is successful operation
		});
	};

	handleUploadPresetChange = (e) => {
		this.setState({ upload_preset: e.target.value });
	};

	handleApiKeyChange = (e) => {
		this.setState({ api_key: e.target.value });
	};

	handleFolderPathChange = (e) => {
		this.setState({ folderPath: e.target.value });
	};

	render() {
		const dropzoneStyle = {
			width: '100%',
			height: '170px',
			border: '2px solid black',
			borderColor: 'rgba(207, 234, 225, 0.19)',
			borderStyle: 'dashed',
			borderRadius: '5',
			margin: '5px',
			background: 'rgba(207, 234, 225, 0.19)'
		};

		const circleContainerStyle = {
			width: '250px',
			height: '250px',
			display: 'inline-block'
		};
		return (
			<div>
				{this.state.error && (
					<Alert color="danger" className={styles.errorMsg}>
						{this.state.error}
					</Alert>
				)}
				{this.state.files.length !== 0 && (
					<Alert color="danger" className={styles.errorMsg}>
						{this.state.files.map((f) => (
							<li key={f.name}>
								{f.name} - {f.size / 1000} KB
							</li>
						))}
					</Alert>
				)}
				<div className={styles.container} data-tid="container">
					<div className={styles.cloudinaryIcon}>
						<CloudinaryIcon height="100" width="100" />
					</div>
					<section style={{ width: '100%' }}>
						<div className="dropzone">
							<Dropzone
								onDrop={this.handleDrop}
								multiple
								accept="image/*"
								className="dropzone"
								style={dropzoneStyle}
							>
								<p className={styles.dropZoneFont}>
									Try dropping some files here, or click to select files to upload.
								</p>
								<div className={styles.containerStyle}>
									{this.state.percent === 0 ? (
										''
									) : (
										<Line
											percent={this.state.percent}
											strokeWidth="1"
											strokeColor={this.state.color}
										/>
									)}
								</div>
							</Dropzone>
						</div>
					</section>
					<Input
						bsSize="sm"
						className={styles.configText}
						placeholder="Upload Preset"
						value={this.state.upload_preset}
						onChange={this.handleUploadPresetChange}
					/>
					<Input
						bsSize="sm"
						className={styles.configText}
						placeholder="API SecretKey"
						value={this.state.api_key}
						onChange={this.handleApiKeyChange}
					/>

					<Input
						bsSize="sm"
						className={styles.configText}
						placeholder="Folder path"
						value={this.state.folderPath}
						onChange={this.handleFolderPathChange}
					/>
				</div>
			</div>
		);
	}
}
