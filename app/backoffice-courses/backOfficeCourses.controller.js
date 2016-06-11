/**
 * Created by Norman on 08/06/2016.
 */
/**
 * Back Office Sport Controller
 * @namespace BackOffice Courses
 */
angular
    .module('backOfficeModule')
    .controller('BackOfficeCoursesController', BackOfficeCoursesController);

    BackOfficeCoursesController.$inject = ['dialogService', 'formResetService', 'backOfficeSportService', 'loginService',
        'backOfficeEstabService','backOfficeCoursesService','backOfficeScheduleService'];

    /**
     *
     * @namespace BackOfficeCoursesController
     * @desc Controller that manages all the operatiosn related to courses
     * @memberOf BackOffice Courses
     *
     */
    function BackOfficeCoursesController(dialogService,formResetService, backOfficeSportService, loginService,
                                         backOfficeEstabService,backOfficeCoursesService,backOfficeScheduleService) {
        var vm = this;

        vm.addCourse = addCourse;
        vm.addSchedule = addSchedule;
        vm.addSchedView = false;
        vm.addView = false;
        vm.backToList = backToList;
        vm.course = null;
        vm.courses = [];
        vm.currentCourses = [];
        vm.deleteCourse = deleteCourse;
        vm.deleteSchedule = deleteSchedule;
        vm.getCourse = getCourse;
        vm.getCourses = getCourses;
        vm.getFullEstabs = getFullEstabs;
        vm.getSchedule = getSchedule;
        vm.modifyValues = modifyValues;
        vm.schedule = [];
        vm.sports = [];
        vm.updateCourse = updateCourse;

        getFullEstabs();

        /**
         * @name addCourse
         * @desc Add new course and push it to courses array
         * @param data-> Contains the data of the new course to be added
         * @param ev -> Event captured
         * @param form-> Add Form Course (it will be reseted)
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function addCourse(data,ev,form){
            var dataDialog = {};
            backOfficeCoursesService.add(data).then(function(res){
                if(res === false){
                    dataDialog = {
                        title: '¡Error!', text: 'El curso no ha podido ser añadido. Por favor, inténtalo de nuevo.',
                        aria: 'Added Course Failed Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    for(var i=0;i<vm.courses.length;i++) {
                        if(vm.courses[i].establishmentId === parseInt(data.establishmentId)){
                            vm.courses[i].rows.push(res);
                        }
                    }
                    dataDialog = {
                        title: '¡Curso Añadido!', text: 'El curso ha sido añadido correctamente.',
                        aria: 'Added Course Alert', textButton: 'Listo'
                    };
                    formResetService.reset(form);
                    data = {};
                    backToList();
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }


        function addSchedule(data,form,ev){
            var dataDialog = {};
            data.courseId = vm.selectedCourse;
            backOfficeScheduleService.add(data).then(function(res){
                if(res === true){
                    vm.schedule.push(data);
                    vm.addSchedView = false;
                    dataDialog = {
                        title: '¡Hora Añadida!', text: 'La hora ha sido correctamente añadida al horario.',
                        aria: 'Added Schedule Alert', textButton: 'Listo'
                    };
                    formResetService.reset(form);
                    vm.newSchedule = {};
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Error!', text: 'No se ha podido añadir la hora al horario. Por favor, inténtalo de nuevo.',
                        aria: 'Added Schedule Alert Failed', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }

        /**
         * @name backToList
         * @desc It changes the view back to list of courses
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function backToList(){
            vm.selectedC = null;
            vm.selectedEst = null;
            vm.selectedCourse = null;
            vm.currentCourses = [];
            vm.schedule = [];
            vm.addView = false;
        }

        /**
         * @name deleteCourse
         * @desc Looks up the course into courses array and deletes it
         * @param id-> Id of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function deleteCourse(id,ev){
            var dataDialog = {};
            backOfficeCoursesService.deleteCourse(id).then(function(res){
                if(res) {
                    for (var i = 0; i < vm.courses.length; i++) {
                        for (var j = 0; j < vm.courses[i].rows.length; j++) {
                            if (vm.courses[i].rows[j].id === id) {
                                vm.courses[i].rows.splice(j,1);
                            }
                        }
                    }
                    dataDialog = {
                        title: '¡Curso eliminado!', text: 'El curso y sus horarios asociados, han sido eliminados correctamente.',
                        aria: 'Deleted Courses Alert', textButton: 'Listo'
                    };
                    backToList();
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Error!', text: 'El curso no se ha podido eliminar. Por favor, inténtalo de nuevo.',
                        aria: 'Deleted Courses Alert Failed', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }

        /**
         * @name deleteSchedule
         * @desc Looks up the schedule into schedule array and deletes it
         * @param id-> Id of the schedule
         * @param ev-> Event captued
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function deleteSchedule(id,ev){
            var dataDialog = {};
            for (var i = 0; i < vm.schedule.length; i++) {
                if (vm.schedule[i].id === id) {
                    vm.schedule.splice(i,1);
                }
            }
            dataDialog = {
                title: '¡Horario eliminado!', text: 'El horario seleccionado, ha sido eliminado correctamente.',
                aria: 'Deleted Schedule Alert', textButton: 'Listo'
            };
            dialogService.showDialog(dataDialog, ev);
        }

        /**
         * @name getCourse
         * @desc Looks up the course into courses array and sets course property
         * @param id-> Id of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getCourse(id){
            for(var i=0;i<vm.courses.length;i++) {
                for (var j = 0; j < vm.courses[i].rows.length; j++) {
                    if (vm.courses[i].rows[j].id === parseInt(id)) {
                        vm.course = vm.courses[i].rows[j];
                        vm.selectedC = angular.copy(vm.courses[i].rows[j]);
                    }
                }
            }
        }
        /**
         * @name getCourses
         * @desc Get the courses from the specified estab, and push all of them to currentCourses array
         * @param id -> The id of the establishment
         * @param ev -> Event captured
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getCourses(id,ev){
            vm.currentCourses = [];
            var dataDialog = {};
            for(var i=0;i<vm.courses.length;i++){
                if(vm.courses[i].establishmentId === parseInt(id)){
                    for(var j=0;j<vm.courses[i].rows.length;j++){
                        vm.currentCourses.push(vm.courses[i].rows[j]);
                    }
                }
            }

            if(vm.currentCourses.length === 0){
                dataDialog = {
                    title: '¡Sin resultados!', text: 'El establecimiento seleccionado no tiene cursos asignados todavía.',
                    aria: 'Search Courses Alert', textButton: 'Listo'
                };
                dialogService.showDialog(dataDialog, ev);
            }
        }

        /**
         * @name getEstabs
         * @desc Fetch all the establishments
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getFullEstabs(){
            if(loginService.isLoggedIn()) {
                backOfficeEstabService.getFullEsts().then(function(data){
                    vm.fullEstabs = data;
                    vm.courses = backOfficeEstabService.getCourses();
                });
            }
        }

        /**
         * @name getSchedule
         * @desc Looks up the schedule into courses array
         * @param id-> Id of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getSchedule(id){
            getCourse(id);
            for(var i=0;i<vm.courses.length;i++) {
                for (var j = 0; j < vm.courses[i].rows.length; j++) {
                    if (vm.courses[i].rows[j].id === parseInt(id)) {
                        vm.schedule = vm.courses[i].rows[j].Schedule;
                    }
                }
            }
        }

        /**
         * @name updateCourse
         * @desc Update the specified course
         * @param id-> Id of course
         * @param data-> Data of course to be updated
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function updateCourse(id,data,ev){
            var d = {info: data.info,instructor: data.instructor,price:data.price};
            var dataDialog={};
           backOfficeCoursesService.update(id,d).then(function(res){
                if(res){
                    modifyValues(id,d);
                    dataDialog = {
                        title: '¡Curso Actualizado!', text: 'La información del curso ha sido actualizada.',
                        aria: 'Course Updated Alert', textButton: 'Listo'
                    };
                    backToList();
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Error!', text: 'Se ha producido un error durante la actualización. Por favor, inténtalo de nuevo.',
                        aria: 'Course Updated Failed Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }

        /**
         * @name modifyValues
         * @desc Looks up for the course and modifies its values
         * @param id-> Id of the course
         * @data data-> New values of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function modifyValues(id,data){
            getCourse(id);
            if(data.info !== undefined){
                vm.course.info = data.info;
            }
            if(data.price !== undefined){
                vm.course.price = data.price;
            }
            if(data.instructor !== undefined){
                vm.course.instructor = data.instructor;
            }
        }


    }