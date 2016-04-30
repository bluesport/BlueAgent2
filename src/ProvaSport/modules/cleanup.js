//cleanup.js
/* check the local data storage and see if there is a duplicate  */
/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Tournament '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


export function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}