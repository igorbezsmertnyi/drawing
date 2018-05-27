export interface DrawParam {
  lineWeight: number
  color: string
  bgImage: string
  bgColor: string
  paintTool: string
  lineCap: string
}

export const initialDrawParam = {
  lineWeight: 1,
  color: '#000',
  bgColor: '#fff',
  bgImage: null,
  paintTool: 'pencil',
  lineCap: 'round'
}