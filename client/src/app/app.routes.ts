import { environment } from '../environments/environment'

const urlBase = environment.production ? '' : 'http://localhost:3000'

export const Routes = {
  getArtboardPath: slug => (
    `${urlBase}/api/artboard/${slug}`
  ),
  createArtboardPath: () => (
    `${urlBase}/api/artboard/create`
  )
}