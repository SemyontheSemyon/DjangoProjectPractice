Vue.prototype.$http = axios

Vue.component('message-row',{
    props:['message'],
    template: '<tr>' +
        '<th>{{message.fields.text}}</th><th>{{message.fields.date}}</th>' +
        '<input type="button" value="Mark as read" @click="mark"/>' +
        '</tr>',
    methods: {
        mark: function () {
            this.$http
                .post('api/mark_read/' + this.message.pk)
            location.reload()
        }
    }
})


Vue.component('messages-list',{
    props:['messages'],
    template:'<table>' +
        '<tr>' +
        '<th>text</th><th>date</th>' +
        '</tr>' +
        '<message-row v-for="message in messages" :message="message" :key="message.pk"/>' +
        '</table>',
    })



var app = new Vue({
        el: '#app',
     delimiters: ['{','}'],
     data:{
        messages:[],
     },
     template: '<div><messages-list :messages="messages"/></div>',
     methods: {
         get_messages: function() {
             this.$http
                 .get('/api/get_messages')
                 .then(result =>
                     result.data.forEach(message => {
                         if(!this.messages.filter(q => q.pk === message.pk).length) {
                             this.messages.push(message);
                         }
                     })
                 )
         }
     },
     created: function () {
            this.get_messages();
            setInterval(this.get_messages, 10000)
     }
 })