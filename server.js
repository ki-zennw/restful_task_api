let express = require('express');
let app = express();

app.use(express.static( __dirname + '/public/dist/public' ));

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restful_task_api');
let TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 1 },
    description: { type: String, required: true, minlength: 6 },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
mongoose.model('Task', TaskSchema);
let Task = mongoose.model('Task')
mongoose.Promise = global.Promise;

app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log('something went wrong finding all the tasks yo', err);
            res.json({ message: "Error", error: err })
        }
        else {
            console.log('successfully found all tasks yo!');
            tasks = tasks;
            console.log(tasks);
            res.json({ message: "Success", tasks: tasks });
        }
    })
})

app.get('/:_id', function (req, res) {
    console.log("req.params.id:", req.params._id)
    Task.findOne({ _id: req.params._id }, function (err, task) {
        console.log(task);
        if (err) {
            console.log('something went wrong finding the task yo', err);
            res.json({ message: "Error", error: err })
        }
        else {
            console.log('successfully found the task yo!');
            task = task;
            res.json({ message: "Success", task: task });
        }
    })
})

app.post('/new', function (req, res) {
    console.log(req.params)
    let task = new Task({
        title: req.body.title,
        description: req.body.description,
    });
    task.save(function (err) {
        if (err) {
            console.log('something went wrong creating a new task yo');
            res.json({ message: "Error", error: err })
        }
        else {
            console.log('successfully created this task yo!');
            task = task;
            console.log(task);
            res.json({ message: "Success", task: task });
        }
    })
})

app.put('/update/:_id', function (req, res) {
    Task.find({ _id: req.params._id }, function (err, task) {
        console.log(task);
        task[0].title = req.body.title;
        task[0].description = req.body.description;
        task[0].completed = req.body.completed;
        task[0].save(function (err) {
            if (err) {
                console.log("updating task didn't go so well yo");
                res.json({ message: "Error", error: err })
            }
            else {
                console.log("successfully updated task yo!");
                task = task;
                res.json({ message: "Success", task: task })
            }
        })
    })
})

app.delete('/delete/:_id', function (req, res) {
    Task.remove({ _id: req.params._id }, function (err) {
        if (err) {
            console.log('something went wrong w/ deleting yo');
            res.json({ message: 'Error', error: err });
        }
        else {
            console.log('successfully deleted task yo!');
            Task.find({}, function (err, tasks) {
                if (err) {
                    console.log('something went wrong finding all the tasks yo', err);
                    res.json({ message: "Error", error: err })
                }
                else {
                    console.log('successfully found all tasks yo!');
                    tasks = tasks;
                    console.log(tasks);
                    res.json({ message: "Success", tasks: tasks });
                }
            })
        }
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})