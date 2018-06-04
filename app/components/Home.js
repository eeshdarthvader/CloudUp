// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { Line } from 'rc-progress'
import CloudinaryIcon from './CloudinaryIcon'
import CloudinaryConfig from '../utils/cloudinaryAccount'
import styles from './Home.css'

type Props = {}

export default class Home extends Component<Props> {
  constructor() {
    super()
    this.state = { files: [], percent: 0, color: '#3FC7FA' }
  }

  props: Props

  handleDrop = files => {
    this.setState({ percent: 0 })

    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tags', `cleartrip, medium, gist`)
      formData.append('upload_preset', CloudinaryConfig.upload_preset) // Replace the preset name with your own
      formData.append('api_key', CloudinaryConfig.api_key) // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0)

      const config = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        onUploadProgress: progressEvent => {
          const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A']

          var percent = Math.round(
            progressEvent.loaded * 100 / progressEvent.total
          )
          if (percent >= 100) {
            this.setState({
              percent: 100,
              color: '#3FC7FA'
            })
          } else {
            this.setState({
              percent,
              color: colorMap[parseInt(Math.random() * 3, 10)]
            })
          }
        }
      }

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/cleartrip/image/upload',
          formData,
          config
        )
        .then(response => {
          const data = response.data
          const fileURL = data.secure_url // You should store this URL for future references in your app
          console.log(data)
          this.setState({
            files,
            percent: 0
          })
        })
        .catch(function(error) {
          console.log(error)
          that.setState({ percent: 0 })
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

    const circleContainerStyle = {
      width: '250px',
      height: '250px',
      display: 'inline-block'
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
            <aside>
              <ul>
                {this.state.files.map(f => (
                  <li key={f.name}>
                    {f.name} - {f.size / 1000} KB
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
