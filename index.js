const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    {id:1 , name:'course1'},
    {id:2 , name:'course2'},
    {id:3 , name:'course3'}

]
app.get('/',(req,res) => {
    res.send('Hello world ...!');
});

app.get('/api/about',(req,res) => {
    res.send(courses);
});



app.post('/api/about',(req,res)=>{
    const { error} = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    /* //for input validation without using joi library
    if (!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be minimum 3 char');
        return;
    }*/
    const course={
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/about/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with given id is not found.');

    const { error} = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/about/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with given id is not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

app.get('/api/about/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the course with given id is not found.');
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});