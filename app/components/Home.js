// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import CloudinaryIcon from './Cloudinary'
import styles from './Home.css'

type Props = {}

export default class Home extends Component<Props> {
  props: Props

  handleDrop = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tags', `cleartrip, medium, gist`)
      formData.append('upload_preset', 'w0htfe5t') // Replace the preset name with your own
      formData.append('api_key', '948861642597617') // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0)

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/cleartrip/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }
        )
        .then(response => {
          const data = response.data
          const fileURL = data.secure_url // You should store this URL for future references in your app
          console.log(data)
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    })
  }

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div className={styles.cloudinaryIcon}>
            <CloudinaryIcon height="100" width="100" />
          </div>
          <div className={styles.uploadPhoto}>
            <Dropzone
              onDrop={this.handleDrop}
              multiple
              accept="image/*"
              style={styles.dropzone}
            >
              <p>Drop your files or click here to upload</p>
            </Dropzone>
          </div>
        </div>
      </div>
    )
  }
}
