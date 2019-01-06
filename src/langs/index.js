import en from '../langs/en'
import id from '../langs/id'
import config from '../config'
import _ from 'lodash'

const lang = (key) => {
    const idLang = config.lang_id
    let lang

    switch (idLang) {
        case 'en':
            lang = en()
            break;

        case 'id':
            lang = id()
            break;

        default:
            lang = en()
            break;
    }

    return resolver(lang, key)
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const resolver = (lang, key) => {
    if (lang.has(key)) {
        return lang.get(key)
    }

    if (_.startsWith(key, "required.", 0)) {
        const start = "required.".length
        let field = key.slice(start)
        const compiled = _.template(lang.get("required_field"))

        if (lang.has(field)) {
            field = lang.get(field)
        } else {
            field = backwardsLang(field)
        }

        return compiled({ 'field': field })
    }

    return backwardsLang(key)
}

const backwardsLang = (key) => {
    return key.capitalize().replace("_", " ")
}

export default lang;