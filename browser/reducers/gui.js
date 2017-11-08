/**
 * Manages the GUI, and anything that does not directly change the database itself.
 */
export default function guiReducer(state, action) {
    switch (action.type) {
        // UPDATE active navTab
        case 'NAV_ENTRY_CLICK':
            var newStateDiff = {}
            if (!action.entries.includes(state.activeEntry)) {
                newStateDiff.activeEntry = null
            }
            return Object.assign({}, state, newStateDiff, {
                activePane: 'nav',
                activeNavTab: action.sNavTab, // s shorthand for selected
                activeNavTabType: action.sNavTabType,
                activeEntries: action.entries
            })
        case 'ENTRY_CLICK':
            return Object.assign({}, state, {
                activePane: 'entries',
                activeEntry: action.sEntryId,
                activeInfo: action.info
            })
        case 'UNMARK_FAV':
            if (state.get('activeNavTabType') !== 'favorites') {
                return state
            } else { //if we are looking at favorites
                // then remove the entry being unmarked from the list and clear info
                var del_idx = state.get('activeEntries').indexOf(action.id)
                if (del_idx !== -1) {
                    return state.withMutations((state) => {
                        state.update('activeEntries', list => list.splice(del_idx, 1))
                        if (del_idx < state.get('activeEntries').size) { // if there is an entry after the deleted entry
                            state.set('activeEntry', state.getIn(['activeEntries', del_idx]))
                        } else { // if the deleted entry is the last entry
                            // if there is no more entries
                            if (state.get('activeEntries').size === 0) {
                                state.set('activeEntry', null)
                                state.set('activePane', 'nav')
                            } else { // if there are more entries before the deleted entry
                                state.set('activeEntry', state.getIn(['activeEntries', del_idx - 1]))
                            }
                        }
                    })
                } else {
                    throw 'ENTRY TO BE UNMARKED DOES NOT ALREADY EXIST IN THE FAVORITES LIST'
                }
            }
        case 'SEARCH_ENTRIES_LOADING':
            return state.set('activeEntries', 'loading')
                .set('activePane', 'search')
        case 'SEARCH_ENTRIES_DONE':
            return state.set('activeEntries', action.entries)
        case 'CREATE_ENTRY':
            return state
                .set('activePane', 'entries')
                .set('activeNavTabType', 'categories')
                .set('activeNavTab', action.category)
                .set('activeEntries', action.entries === undefined ? List([action.newId]) : action.entries.unshift(action.newId))
                .set('activeEntry', action.newId)
        case 'DELETE_ENTRY':
            var del_idx = state.get('activeEntries').indexOf(action.id)
            if (del_idx !== -1) {
                return state.withMutations((state) => {
                    state.update('activeEntries', list => list.splice(del_idx, 1))
                    if (del_idx < state.get('activeEntries').size) { // if there is an entry after the deleted entry
                        state.set('activeEntry', state.getIn(['activeEntries', del_idx]))
                    } else { // if the deleted entry is the last entry
                        // if there is no more entries
                        if (state.get('activeEntries').size === 0) {
                            state.set('activeEntry', null)
                            state.set('activePane', 'nav')
                        } else { // if there are more entries before the deleted entry
                            state.set('activeEntry', state.getIn(['activeEntries', del_idx - 1]))
                        }
                    }
                })
            } else {
                throw 'ENTRY TO BE DELETED DOES NOT ALREADY EXIST IN THE FAVORITES LIST'
            }

        case 'DISPLAY_MODAL':
            return state.set('modal', action.modal)
        case 'MODAL_STATUS_UPDATE':
            return state
                .set('modalResponse', action.response)
        case 'CLOSE_MODAL':
            return state
                .set('modal', null)
                .set('modalResponse', null)
        default:
            return state
    }
}