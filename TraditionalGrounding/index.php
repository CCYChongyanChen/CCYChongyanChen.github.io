
<!DOCTYPE html>
<html>
    <head>
    
    <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
  
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">  
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="static/css/style.css">
    
    <!-- jQuery steps CSS -->
    <link rel="stylesheet" href="static/css/jquery.steps.css"/>
    <!-- jQuery library -->
    <script src="static/js/jquery.min.js"></script>
    <!-- <script src="static/js/jquery.js"></script>  -->
    <script src="static/js/jquery.steps.js"></script>
    <script type="text/javascript" src="static/QA_annotations/test.json"></script>
    <!-- Latest compiled JavaScript -->
    <script src="static/js/bootstrap.min.js"></script>
    <script type='text/javascript' src='https://s3.amazonaws.com/mturk-public/externalHIT_v1.js'></script>
    </head>
    <body>
        
        
        <!-- <p id="demo">Click the button to change the text in this paragraph.</p> -->
        <div class="container">







                    <!---------- header area ------------>
                    <div class="row">
                            <div class="col-lg-12">
                                <!--h3 style="text-align: center"><?=$title?></h3-->
                                <br/>
                                <!-- Button open collapse -->
                                <button type="button" id="showDtl"
                                        data-toggle="collapse" data-target="#dtlPane"
                                        class="btn btn-default btn-sm center-block" >
                                    Hide / Show Details
                                </button>
                
                                <!-- task details -->
                                <div class="collapse in" id="dtlPane">
                                    <div class="alert alert-warning motivation">
                                            <ul>

                                                    <?php for($i=1;$i<=5;$i++){ ?>
                                                    
                                                    <li>Menu Item <?php echo $i; ?></li>
                                                    
                                                    <?php } ?>
                                                    
                                            </ul>

                                            <br><strong>Motivation:</strong> We aim to build a smart system that can automatically answer visual questions from blind people. The images and questions you will see are from visually impaired people and the answer are from crowd workers. To improve the performance of our artificial intelligence algorithm, we need your help to visually around each answer. This helps the model learn which region of the image it should pay attention in order to get the answer.
                                            <br><br>
                                            <strong>We ask you to: </strong>
                                                carefully review the question and image as well as the existing 10 answers: 
                                                Carefully review the question, image, and the answer provided, and then (1) indicate if there is more than one question (2) indicate if the answer is referring to more than one region/object. Step 3 will be activated after finishing step 1 and step 2.  (3) Draw the region where the answer is referring to. You may select "nothing to draw" option. (4) Indicate if the region is totally visible or indicate the reason why you cannot ground the answer for this image. You will annotate for five image-question pairs in one HIT. 
                                            
                                            <br>
                                            <br>
                                                
                                                
                                            <strong>Task examples </strong>
                                            
                                                Example 1 Example 2
                
                                            <br>
                                            <br>
                                                
                                            
                                            <strong>Difficult examples for step 3</strong>
                                            <br>
                                            <br>PLEASE NOTE: It is possible that some images could be meaningless, inappropriate, or offensive. We cannot control what pictures are taken. Kindly use your best judgement for this task.
                                            <br>IMPORTANT: Please do not refresh the webpage once you have started working, as you will lose all your progress, and have to start at the beginning.                 
                                            
                                       
                
                
                                        <button id="hideDtl" type="button" class="btn btn-warning btn-sm center-block">
                                            Hide
                                        </button>
                
                                        <small style="display: block; text-align: center; font-size: 13px; margin-top: 5px; font-style: italic">
                                            You can see this information anytime by clicking "Hide / Show Details" button above.
                                        </small>
                                    </div>
                
                                </div>
                
                            </div>
                        </div>





        </div>



        
        <div class="myDIV"><button class="glyphicon glyphicon-question-sign" aria-hidden="true"></button></div>
        <div class="hide">I am shown when someone hovers over the div above.</div>


        <!-- panel-heading -->
        <form name='mturk_form' method='post' id='mturk_form' action='https://www.mturk.com/mturk/externalSubmit'><input type='hidden' value='' name='assignmentId' id='assignmentId'/>
        
            <div class="container">
            <ul class="nav nav-tabs">
                    <li class="active"><a href="#tab1" data-toggle="tab">Image 1</a></li>
                    <li><a href="#tab2" data-toggle="tab">Image 2</a></li>
                    <li><a href="#tab3" data-toggle="tab">Image 3</a></li>
                    <li><a href="#tab4" data-toggle="tab">Image 4</a></li>
                    <li><a href="#tab5" data-toggle="tab">Image 5</a></li>
            </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab1">

                                            <!-------- main content ---------->
                                            <div class="row">
                    
                                                <!------- image column ------->
                                                <div class="col-sm-6">
                    
                                                    <!---------- Image ---------->
                                                    <div class="image_wrap" style="overflow: hidden">
                    
                                                        <div class="viewer" style="
                                                            height: 700px;
                                                            width: 100%;
                                                            border: 1px solid black;
                                                            position: relative;
                                                        ">
                    
                                                        <h3 class="text-secondary" id="question1"></h3>
                                                        <h3 class="text-secondary" id="answer1"></h3>
                                                        <h3 class="text-secondary" id="question2"></h3>
                                                        <h3 class="text-secondary" id="answer2"></h3>
                                                        <h3 class="text-secondary" id="question3"></h3>
                                                        <h3 class="text-secondary" id="answer3"></h3>
                                                        <h3 class="text-secondary" id="question4"></h3>
                                                        <h3 class="text-secondary" id="answer4"></h3>
                                                        <h3 class="text-secondary" id="question5"></h3>
                                                        <h3 class="text-secondary" id="answer5"></h3>
                                                        <div id="selectareas"></div>
                    
                                                        <input type="hidden" id="task1forsubmit" name="task1forsubmit">
                    
                    
                                                        <p id="task1forsubmit2" name="task1forsubmit2"></p>
                    
                                                        <div id="task1forsubmit3">
                    
                                                        </div>
                    
                                                        <div  id="canvaswrapper" style="position:relative;width:500px; height:500px;">
                                                            <canvas id="zoom" width="200" height="200" 
                                                            style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>
                                                            <canvas id="canvas" width="400" height="500" 
                                                            style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
                                                            <canvas id="myCanvas" width="400" height="500" 
                                                            style="position: absolute; left: 0; top: 0; z-index: 2; "></canvas>
                                                            <!-- <canvas id="canvas" width="1000" height="1000" style="border:1px solid #c3c3c3;"></canvas> -->
                                                        </div>
                                                        <button type="button" class="btn btn-secondary" onclick="DeleteAllThenInit()">Clear</button>
                                                        <button type="button" class="btn btn-secondary" onclick="UnDo()" data-toggle="tooltip"  data-placement="top" title="ctrl+z">UnDo</button>
                                                        <button type="button" class="btn btn-secondary" onclick="Magnify()">Magnify</button>
                                                        </div>
                    
                    
                                                    </div>
                                                </div>
                    
                                                <!----------- all tasks column ----------->
                                                <div class="col-sm-6">
                                                            <!----------  Step: Visual Grounding ------------>
                                                            <div class="col-lg-12">
                                                                <h4 style="
                                                                    text-align: left;
                                                                    font-weight: bold;
                                                                    padding: 5px;
                                                                    margin: 0px 0px 15px;
                                                                ">
                                                                Please read the following question and answer about the image to the left and finish the 3 steps below 
                                                                </h4>
                                                            <!-- </div> -->
                    
                                                            </div><!----------  Step: Visual Grounding ------------>
                    
                                                            <!----------  Step: Text Detection ------------>
                                                            <div class="row">
                                                                <div class="col-lg-12 text_detect border-around" style="margin-top: 30px;">
                    
                                                                    <table class="ansChoices table table-condensed"
                                                                        style="">
                                                                        <thead>
                                                                        <tr>
                                                                            <th colspan="4" class="text-center" style="">
                                                                                <h4 style="font-weight: bold; margin: 2px auto">
                                                                                    Step 1: Is there more than one question asked?
                                                                                </h4>
                                                                                
                                                                                <button class="glyphicon glyphicon-question-sign" aria-hidden="true"></button>
                                                                                
                    
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                    
                                                                        <tbody>
                                                                        <tr>
                                                                            <!-- Col 1 -->
                                                                            <td style="width: 50%; padding-left: 0px">
                    
                                                                                <div class="radio ans_choice pull-right">
                                                                                    <label>
                                                                                        <input name="TEXT_DETECT" type="checkbox" value="Y">
                                                                                        <strong>YES:</strong>
                                                                                        More than one questions asked.
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                    
                                                                            <!-- Col 2 -->
                                                                            <td style="width: 50%; padding-right: 0px">
                    
                                                                                <div class="radio ans_choice pull-left">
                                                                                    <label>
                                                                                        <input name="TEXT_DETECT" type="checkbox" value="N">
                                                                                        <strong>NO:</strong>
                                                                                        Just one question asked.
                                                                                    </label>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                    
                                                                </div>
                    
                                                            </div><!----------  Step: Text Detection ------------>
                    
                    
                                                            <!---------- Step: Multi-focus ---------->
                                                            <div class="row">
                    
                                                                <div class="col-sm-12 quality_issues border-around" style="margin-top: 30px;">
                    
                                                                    <table class="ansChoices table table-condensed" style="">
                                                                        <thead>
                                                                        <tr>
                                                                            <th colspan="4" class="text-center" style="">
                                                                                <h4 style="font-weight: bold; margin: 2px auto">
                                                                                    Step 2: Does the answer have multi-focus?
                                                                                </h4>
                                                                                <nobr><button class="glyphicon glyphicon-question-sign" aria-hidden="true"></button></nobr>
                                                                                
                    
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                    
                                    
                    
                    
                                                                        <tbody>
                                                                            <tr>
                                                                                <!-- Col 1 -->
                                                                                <td style="width: 50%; padding-left: 0px">
                    
                                                                                    <div class="radio ans_choice pull-right">
                                                                                        <label>
                                                                                            <input name="MULTI_FOCUS_DETECT" type="checkbox" value="Y">
                                                                                            <strong>YES:</strong>
                                                                                            The answer focus on multi-objects.
                                                                                        </label>
                                                                                    </div>
                                                                                </td>
                    
                                                                                <!-- Col 2 -->
                                                                                <td style="width: 50%; padding-right: 0px">
                    
                                                                                    <div class="radio ans_choice pull-left">
                                                                                        <label>
                                                                                            <input name="MULTI_FOCUS_DETECT" type="checkbox" value="N">
                                                                                            <strong>NO:</strong>
                                                                                            It just refers to one object.
                                                                                        </label>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                    
                    
                    
                                                                    </table>
                    
                    
                                                                </div>
                                                            </div> <!---------- Step: Multi-focus ---------->
                    
                    
                    
                                                            <!---------- Step: Draw polygon ---------->
                                                            <div class="row">
                    
                                                                <div class="col-sm-12 quality_issues border-around" style="margin-top: 30px;">
                    
                                                                    <table class="ansChoices table table-condensed" style="">
                                                                        <thead>
                                                                        <tr>
                                                                            <th colspan="4" class="text-center" style="">
                                                                                <h4 style="font-weight: bold; margin: 2px auto">
                                                                                    Step 3: Draw one closed polygon to ground region that each answer is referring to by clicking on the image.
                                                                                </h4>
                                                                                <button class="glyphicon glyphicon-question-sign" aria-hidden="true"></button>
                                                                                
                    
                                                                            </th>
                                                                        </tr>
                                                                        </thead>
                                                                    </table>
                    
                                                                    <p style="text-align: center; font-weight: bold;
                                                                    margin: 10px 0px; font-size: 18px;">
                                                                OR
                                                                    </p>
                    
                    
                    
                    
                                                                                                    <div class="checkbox ans_choice"
                                                                                                        style="width: 85%; margin: 0 auto; text-align: center">
                                                                                                        <label>
                                                                                                            <input name="Q_ISSUE" type="checkbox" value="NONE">
                                                                                                            <strong>NO ISSUES:</strong>
                                                                                                            Cannot draw for this image
                                                                                                        </label>
                                                                                                    </div>
                    
                    
                    
                                                                                                    <div class="row">
                                                                                                        <div class="col-lg-12">
                    
                                                                                                            <div class="input-group ">
                                                                                                                <span class="input-group-addon">
                                                                                                                    <div class="checkbox" style="margin-top: 0px; margin-bottom: 0px;">
                                                                                                                        <label style="margin-top: 0px; margin-bottom: 0px;">
                                                                                                                            <input name="Q_ISSUE" type="checkbox" value="OTH">
                                                                                                                            Provide your reason:
                                                                                                                        </label>
                                                                                                                    </div>
                                                                                                                </span>
                                                                                                                <input name="Q_ISSUE_OTH" type="text"
                                                                                                                    placeholder="Input your reason for not drawing for this imagee"
                                                                                                                    title="Input your reason for not drawing for this image"
                                                                                                                    class="form-control">
                                                                                                            </div>
                    
                    
                    
                                                                                                        </div>
                                                                                                    </div>
                    
                                                                </div>
                                                            </div> <!---------- Step: Draw polygon ---------->
                                                </div>
                                                <!--- end all tasks column --->
                    
                    
                                                <p id ="xycoorcommonAnswer"></p>
                    
                    
                                                
                    
                    
                                            </div>
                    
                                            
                    
                                    <!-- end section 1-->
                    
                                
                    


                        <a class="btn btn-primary btnNext" >Next</a>
                    </div>
                    <div class="tab-pane" id="tab2">
                        <a class="btn btn-primary btnPrevious" >Previous</a>
                        <a class="btn btn-primary btnNext" >Next</a>
                    </div>
                    
                    <div class="tab-pane" id="tab3">
                            <a class="btn btn-primary btnPrevious" >Previous</a>
                            <a class="btn btn-primary btnNext" >Next</a>
                        </div>
                        
                    <div class="tab-pane" id="tab4">
                            <a class="btn btn-primary btnPrevious" >Previous</a>
                            <a class="btn btn-primary btnNext" >Next</a>
                        </div>
                    <div class="tab-pane" id="tab5">
                            <label style="margin-bottom: 5px">
                                    Do you have any suggestions, feedback, or general comments for us?
                                    <span class="text-muted">(optional)</span>
                                </label>
                        
                                <textarea name="WORKER_COMMENTS" 
                                style="font-size:18px" class="form-control  input-lg" rows="2"></textarea>
                                
                        
                        <a class="btn btn-primary btnPrevious" >Previous</a>
                        <p><input type='submit' id='submitButton' value='Submit' /></p>
                    
                    </div>
                </div>
            </div>
            
   

        </form>
    
        <script src="static/js/QA_annotations.js"></script>
        <script src="static/js/Image_related.js"></script>
        <script src="static/js/Whole_HTML.js"></script>


        
        <script language='Javascript'>turkSetAssignmentID();</script>
    </body>
</html>