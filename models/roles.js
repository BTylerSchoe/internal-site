// let roles = {
//     manager: {
//         can: ['publish'],
//         inherits: ['writer']
//     },
//     writer: {
//         can: ['write'],
//         inherits: ['guest']
//     },
//     guest: {
//         can: ['read']
//     }
// }

// function can(role, operation) {
//     return roles[role] && roles[role].can.indexOf(operation) !== -1;
// }