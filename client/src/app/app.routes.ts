import { environment } from '../environments/environment'

const urlBase = environment.production ? '' : '//localhost:3000'
const wsProtocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:'

export const Routes = {
  artboardPath: slug => (
    `${urlBase}/api/artboard/${slug}`
  ),
  createArtboardPath: () => (
    `${urlBase}/api/artboard/create`
  ),
  artboardHubPath: slug => (
    `${wsProtocol}/${window.location.host}/api/artboard/hub/${slug}`
  )
}