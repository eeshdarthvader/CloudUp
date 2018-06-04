// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import CloudinaryIcon from './Cloudinary'
import styles from './Home.css'

type Props = {}

export default class Home extends Component<Props> {
  constructor() {
    super()
    this.state = { files: [] }
  }

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
          this.setState({
            files
          })
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    })
  }

  render() {
    const dropzoneStyle = {
      width: '100%',
      height: '170px',
      border: '1px solid black',
      borderColor: 'rgb(193, 51, 136)',
      borderStyle: 'dashed',
      borderRadius: '5'
    }
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <div className={styles.cloudinaryIcon}>
            <CloudinaryIcon height="100" width="100" />
          </div>
          <section style={{ width: '98%' }}>
            <div className="dropzone">
              <Dropzone
                onDrop={this.handleDrop}
                multiple
                accept="image/*"
                className="dropzone"
                style={dropzoneStyle}
              >
                <p className={styles.dropZoneFont}>
                  Try dropping some files here, or click to select files to
                  upload.
                </p>
              </Dropzone>
            </div>
            <aside>
              <ul>
                {this.state.files.map(f => (
                  <li key={f.name}>
                    {f.name} - {f.size} bytes
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        </div>
      </div>
    )
  }
}
