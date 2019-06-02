import antdEn from 'antd/lib/locale-provider/en_GB'
import appLocaleData from 'react-intl/locale-data/en'
import enMessages from './en_GB.json'

export default {
    messages: {
        ...enMessages,
    },
    antd: antdEn,
    locale: 'en',
    data: appLocaleData,
}