const Op = require('sequelize').Op

const models = require('../models')
const User = models.User
const Member = models.Member
const Group = models.Group
const Problem = models.Problem
const Guide = models.Guide
const Session = models.Session


module.exports = {
    // Dashboard
    getDashboard: async (req, res) => {

        const requestees = await req.user.getRequestees()
        const requesters = await req.user.getRequesters()
        const friends = await req.user.getFriends()
        const guides = await Guide.findAll({
            where: {
                userId: req.user.id
            },
            raw: true
        })
        const groups = await Group.findAll({
            where: {
                leaderId: req.user.id
            },
            raw: true
        })
        const sessions = await Session.findAll({
            where: {
                userId: req.user.id
            },
            raw: true
        })

        let sessionsArr = []

        for (let session of sessions) {
            let sessionObj = {}
            sessionObj.name = session.name
            sessionObj.id = session.id
            sessionObj.userId = req.user.id

            for (let group of groups) {
                if (session.groupId === group.id) {
                    sessionObj.groupName = group.name
                }
            }

            for (let guide of guides) {
                if (session.guideId === guide.id) {
                    sessionObj.guideName = guide.name
                }
            }
            sessionsArr.push(sessionObj)
        }

        res.render('dashboard', {
            username: req.user.username,
            requestees,
            requesters,
            friends,
            guides,
            groups,
            sessions: sessionsArr
        })
    },
    // Create, edit, and delete group
    getCreateGroup: async (req, res) => {

        const friends = await req.user.getFriends()

        if (friends.length === 0) {
            return res.status(200).json({ 200: 'Cannot create group without friends' })
        }

        res.render('addGroup', { friends })
    },
    postCreateGroup: async (req, res) => {
        
        const groupName = req.body.name

        console.log(groupName)

        if (groupName === undefined || groupName === '') {
            return res.redirect('/dashboard/create/group')
        }

        const foundGroup = await Group.findOne({
            where: {
                name: groupName,
                leaderId: req.user.id
            }
        })

        if (foundGroup) {
<<<<<<< HEAD
            return res.status(403).json({ 403: 'Group name already exists' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        let addToGroupIds = req.body.friend
        const groupMembers = []

        console.log(addToGroupIds)

        if (addToGroupIds === undefined) {
            return res.redirect('/dashboard/create/group')
        }

        if (!(addToGroupIds instanceof Array)) {
            addToGroupIds = [req.body.friend]
        }

        const newGroup = await Group.create({
            name: groupName,
            leaderId: req.user.id
        })

        for (const id of addToGroupIds) {
            const foundFriend = await req.user.getFriends({
                where: { id }
            })

            if (foundFriend.length === 0) {
                await newGroup.destroy()
<<<<<<< HEAD
                return res.status(403).json({ 403: 'One of these friends were not found and cannot be added to the group' })
=======
                return res.render('403')
>>>>>>> origin/joe
            }

            groupMembers.push({
                userId: id,
                groupId: newGroup.id
            })
        }

        await Member.bulkCreate(groupMembers)

        res.redirect('/dashboard')

    },
    getEditGroup: async (req, res) => {

    },
    postEditGroup: async (req, res)=> {

    },
    postDeleteGroup: async (req, res) => {
        const id = req.params.groupId

        const foundGroup = await Group.findOne({
            where: { id, leaderId: req.user.id }
        })

        if (!foundGroup) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Group not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundSessions = await Session.findAll({
            where: {
                userId: req.user.id,
                groupId: foundGroup.id
            }
        })

        if (foundSessions !== undefined && foundSessions.length !== 0) {

            const sessionIds = foundSessions.map(session => session.id )

            await Session.destroy({ where: { id: sessionIds } } )
        }

        const groupMembers = await Member.findAll({
            where: {
                groupId: foundGroup.id
            },
            raw: true
        })

        const ids = groupMembers.map(member => member.id ) 

        await Member.destroy({ where: { id: ids } } )
        await foundGroup.destroy()

        res.status(200).json({ 200: 'Group deleted' })

    },
    // Create, edit, and delete study guide
    getCreateGuide: async (req, res) => {

        res.render('addGuide')

    },
    postCreateGuide: async (req, res) => {

        const { name } = req.body
        let questions = req.body.question
        let answers = req.body.answer

        console.log(questions instanceof Array)
        console.log(answers instanceof Array)

        if (!(questions instanceof Array) || !(answers instanceof Array)) {
            questions = [req.body.question]
            answers = [req.body.answer]
        }

        console.log(questions)
        console.log(answers)

        const isUndefined = questions === undefined || answers === undefined
        const isEmpty = questions.length === 0 || answers.length === 0
        const areNotEqualLength = questions.length !== answers.length

        if (!name || isUndefined || isEmpty || areNotEqualLength) {
<<<<<<< HEAD
            return res.status(403).json({ 403: 'Something went wrong with the study guide...' })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundGuide = await Guide.findOne({
            where: { 
                userId: req.user.id,
                name
            }
        })

        if (foundGuide) {
<<<<<<< HEAD
            return res.status(403).json({ 403: 'Guide name must be unique' })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const newGuide = await Guide.create({
            name,
            userId: req.user.id
        })

        const problems = []
        
        questions.forEach((question, index) => {
            problems.push({
                question,
                answer: answers[index],
                guideId: newGuide.id
            })
        })

        await Problem.bulkCreate(problems)

        res.redirect('/dashboard')

    },
    getEditGuide: async (req, res) => {

    },
    postEditGuide: async (req, res) => {

    },
    postDeleteGuide: async (req, res) => {

        const id = req.params.guideId

        const foundGuide = await Guide.findOne({
            where: { id, userId: req.user.id }
        })

        if (!foundGuide) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Study guide not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundSessions = await Session.findAll({
            where: {
                userId: req.user.id,
                guideId: foundGuide.id
            }
        })

        if (foundSessions !== undefined && foundSessions.length !== 0) {

            const sessionIds = foundSessions.map(session => session.id )

            await Session.destroy({ where: { id: sessionIds } } )
        }

        const problems = await Problem.findAll({
            where: {
                guideId: foundGuide.id
            },
            raw: true
        })

        const problemIds = problems.map(problem => problem.id ) 

        await Problem.destroy({ where: { id: problemIds } } )
        await foundGuide.destroy()

        res.status(200).json({ 200: 'Study guide deleted' })

    },
    // Create, edit, and delete study sessions
    getCreateSession: async (req, res) => {

        const groups = await Group.findAll({
            where: {
                leaderId: req.user.id
            }, 
            raw: true
        })

        if (groups === undefined || groups.length === 0) {
<<<<<<< HEAD
            return res.status(403).json({ 403: 'Sessions cannot be made without a study group' })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const guides = await Guide.findAll({
            where: {
                userId: req.user.id
            },
            raw: true
        })

        if (guides === undefined || guides.length === 0) {
<<<<<<< HEAD
            return res.status(403).json({ 403: 'Sessions cannot be made without a study guide' })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        res.render('addSession', { groups, guides })

    },
    postCreateSession: async (req, res) => {

        const { name } = req.body
        const groupId = req.body.group
        const guideId = req.body.guide

        console.log(req.body, groupId, guideId)

        if (!name || !groupId || !guideId) {
            res.redirect('/dashboard/create/session')
        }

        const foundGroup = await Group.findOne({
            where: {
                leaderId: req.user.id,
                id: groupId
            }
        })

        if (!foundGroup) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Group not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundGuide = await Guide.findOne({
            where: {
                userId: req.user.id,
                id: guideId
            }
        })

        if (!foundGuide) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Guide not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundSession = await Session.findOne({
            where: {
                userId: req.user.id,
                [Op.or]: [
                    { name },
                    { groupId, guideId }
                ]
            }
        })

        if (foundSession) {
            return res.redirect('/dashboard/create/session')
        }

        const newSession = await Session.create({ 
            userId: req.user.id, 
            name, 
            groupId, 
            guideId 
        })

        res.redirect('/dashboard')

    },
    postDeleteSession: async (req, res) => {

        const id = req.params.sessionId

        const foundSession = await Session.findOne({
            where: { id, userId: req.user.id }
        })

        if (!foundSession) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Session not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        await foundSession.destroy()

        res.status(200).json({ 200: 'Session deleted' })

    },
    // Session page
    getSession: async (req, res) => {

        const foundSession = await Session.findOne({
            where: {
                id: req.params.sessionId,
            },
        })

        if (!foundSession) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Session not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundGroup = await Group.findOne({
            where: {
                id: foundSession.groupId,
            },
            raw: true
        })

        if (!foundGroup) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Group not found' })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const foundMember = await Member.findOne({
            where: {
                userId: req.user.id,
                groupId: foundSession.groupId
            },
            raw: true
        })

        if (!foundMember && req.user.id !== foundGroup.leaderId) {
<<<<<<< HEAD
            return res.status(401).json({ 401: 'Not allowed to access this session' })
        }

        if (foundSession.active === false && req.user.id !== foundSession.userId) {
            return res.status(401).json({ 401: 'Session is not active' })
=======
            return res.render('401')
        }

        if (foundSession.active === false && req.user.id !== foundSession.userId) {
            return res.render('401')
>>>>>>> origin/joe
        }

        const foundGuide = await Guide.findOne({
            where: {
                id: foundSession.guideId,
            },
            raw: true
        })

        if (!foundGuide) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Guide not found' })
        }

        socketData = {
            sessionId: foundSession.id,
            guideId: foundGuide.id,        
=======
            return res.render('404')
        }

        const foundProblems = await Problem.findAll({
            where: {
                guideId: foundSession.guideId
            }
        })

        if (foundProblems === undefined || foundProblems.length === 0) {
            return res.render('404')
        }

        socketData = {
            userId: req.user.id,
            username: req.user.username,
            room: foundSession.id,
>>>>>>> origin/joe
        }

        if (req.user.id === foundSession.userId) {

            foundSession.active = true
            await foundSession.save()

<<<<<<< HEAD
            socketData.isLeader = true

            return res.render('session', {
                username: req.user.username,
                groupName: foundGroup.name,
                guideName: foundGuide.name,
                sessionName: foundSession.name,
=======
            socketData.leader = req.user.username

            return res.render('session', {
                leader: req.user.username,
                username: req.user.username,
                session: foundSession,
                group: foundGroup,
                guide: foundGuide,
                problems: foundProblems,
>>>>>>> origin/joe
                socketData
            })
        }

        const foundLeader = await User.findOne({
            where: {
                id: foundSession.userId
            }
        })

        if (!foundLeader) {
<<<<<<< HEAD
            return res.status(404).json({ 404: 'Leader not found' })
        }

        socketData.isLeader = false

        res.render('session', {
            username: req.user.username,
            leader: foundLeader.username,
            groupName: foundGroup.name,
            guideName: foundGuide.name,
            sessionName: foundSession.name,
=======
            return res.render('404')
        }

        socketData.leader = foundLeader.username

        res.render('session', {
            leader: foundLeader.username,
            username: req.user.username,
            session: foundSession,
            group: foundGroup,
            guide: foundGuide,
            problems: foundProblems,
>>>>>>> origin/joe
            socketData
        })
    },
    // Search and add friends
    getSearch: async (req, res) => {

        res.status(200).json({ 200: 'Search page' })

    },
    postSearch: async (req, res) => {

        const { username } = req.body

        const foundUser = await User.findOne({
            where: { username }
        })

        if (!foundUser || foundUser.id === req.user.id) {
            return res.json({ username: undefined })
        }

        res.json({
            id: foundUser.id,
            username: foundUser.username 
        })
    },
    postFriendRequest: async (req, res) => {

        const id = req.params.userId

        if (id == req.user.id) {
<<<<<<< HEAD
            return res.status(403).json({ 403: `Cannot friend request yourself!` })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundUser = await User.findOne({
            where: { id }
        })


        if (!foundUser) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `User not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const isFriend = await req.user.hasFriends([foundUser])

        if (isFriend) {
<<<<<<< HEAD
            return res.status(403).json({ 403: `User is already your friend` })
=======
            return res.render('403')
>>>>>>> origin/joe
        }
        
        const isRequestee = await req.user.hasRequestees([foundUser])

        if (isRequestee) {
            return res.status(200).json({ 200: 'You have already friend requested this user' })
        }

        const isRequester = await req.user.hasRequesters([foundUser])

        if (isRequester) {
            return res.status(200).json({ 200: 'User has already friend requested you, accept their friend request to become friends' })
        }

        await req.user.addRequestees(foundUser)

        res.redirect('/dashboard')

    },
    postCancelFriendRequest: async (req, res) => {

        const id  = req.params.userId

        if (id == req.user.id) {
<<<<<<< HEAD
            return res.status(403).json({ 403: `Cannot cancel friend request yourself!` })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundUser = await User.findOne({
            where: { id }
        })

        if (!foundUser) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `User not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const requestee = await req.user.getRequestees({
            where: { id: foundUser.id }
        })

        if (requestee.length === 0) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `Requestee not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        await req.user.removeRequestee(requestee)

        const requestees = await req.user.getRequestees()

        res.status(200).json({ 200: requestees })
    },
    postAcceptFriendRequest: async (req, res) => {

        const id = req.params.userId

        if (id == req.user.id) {
<<<<<<< HEAD
            return res.status(403).json({ 403: `Cannot accept friend request yourself!` })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundUser = await User.findOne({
            where: { id }
        })

        if (!foundUser) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `User not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const requester = await req.user.getRequesters({
            where: { id: foundUser.id }
        })

        if (requester.length === 0) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `Requester not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        await req.user.addFriends(requester)
        await requester[0].addFriends(req.user)
        await req.user.removeRequester(requester)

        const friends = await req.user.getFriends()

        res.status(200).json({ 200: friends })

    },
    postDenyFriendRequest: async (req, res) => {

<<<<<<< HEAD
        const id = req.params.userId

        if (id == req.user.id) {
            return res.status(403).json({ 403: `Cannot deny friend request yourself!` })
=======
        const id = req.params

        if (id == req.user.id) {
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundUser = await User.findOne({
            where: { id }
        })

        if (!foundUser) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `User not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const requester = await req.user.getRequesters({
            where: { id: foundUser.id }
        })

        if (requester.length === 0) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `Requester not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        await req.user.removeRequester(requester)

        const requesters = await req.user.getRequesters()

        res.status(200).json({ 200: requesters })
    },
    postUnfriend: async (req, res) => {

        const id = req.params.userId

        if (id == req.user.id) {
<<<<<<< HEAD
            return res.status(403).json({ 403: `Cannot unfriend yourself!` })
=======
            return res.render('403')
>>>>>>> origin/joe
        }

        const foundUser = await User.findOne({
            where: { id }
        })

        if (!foundUser) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `User not found` })
=======
            return res.render('404')
>>>>>>> origin/joe
        }

        const friend = await req.user.getFriends({
            where: { id: foundUser.id }
        })

        if (friend.length === 0) {
<<<<<<< HEAD
            return res.status(404).json({ 404: `Friend not found` })
        }

        // Still need to check if friend being deleted is in
        // Any groups this user created

=======
            return res.render('404')
        }

>>>>>>> origin/joe
        await req.user.removeFriend(friend)
        await friend[0].removeFriend(req.user)

        const friends = await req.user.getFriends()
        
        res.status(200).json({ 200: friends })
    }
}