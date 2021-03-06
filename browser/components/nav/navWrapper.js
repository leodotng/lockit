// Container for nav
import { connect } from 'react-redux'
import { NAV_ENTRY_CLICK, DELETE_TAG_FROM_NAV, CHANGE_TAG_COLOR, DISPLAY_MODAL, CLOSE_MODAL } from 'actions'
import Nav from './nav.jsx'

// Functions
const mapStateToProps = state => {
    return {
        categories_config: state.getIn(['config', 'categories']),
        categories_cache: state.getIn(['cache', 'categories']),
        tags: state.getIn(['cache', 'tags']),
        activeNavTab: state.getIn(['gui', 'activeNavTab']),
        activeNavTabType: state.getIn(['gui', 'activeNavTabType']),
        activePane: state.getIn(['gui', 'activePane']),
    }
}

const mapDispatchToProps = dispatch => ({
    navTabClick: (navTab, navTabType) => {
        dispatch(NAV_ENTRY_CLICK(navTab, navTabType))
    },
    deleteTagFromNav: (tag) => {
        dispatch(DELETE_TAG_FROM_NAV(tag))
    },
    changeTagColor: (tag, color) => {
        dispatch(CHANGE_TAG_COLOR(tag, color))
    }
})

const NavWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)

export default NavWrapper