import dayjs from 'dayjs'

export const timestamp = (): string => dayjs().format('DD/MM/YYYY HH:mm:ss');