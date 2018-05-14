export interface DrawParam {
  lineWeight: number
  color: string
  bgImage: string
  paintTool: string
  lineCap: string
}

export const initialDrawParam = {
  lineWeight: 1,
  color: '#000',
  bgImage: null,
  paintTool: 'pencil',
  lineCap: 'round'
}