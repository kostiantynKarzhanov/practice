package org.practice;

import org.practice.config.ApplicationConfig;
import org.practice.model.Comment;
import org.practice.service.CommentService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.logging.Logger;

public class Application {

    private static final Logger logger = Logger.getLogger(Application.class.getName());

    public static void main(String[] args) throws Exception{
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);

        for (String beanName : context.getBeanDefinitionNames()) {
            System.out.println(beanName);
        }

        System.out.println("-".repeat(50));
        System.out.println("Total number of beans: " + context.getBeanDefinitionNames().length);

        CommentService commentService = context.getBean(CommentService.class);

        String status = (commentService.getClass().getName().equals(CommentService.class.getName()))
                ? "direct call"
                : "aspect intercepted call";

        System.out.println("*** " + status + ": " + commentService.getClass().getName() + " ***");

        Comment comment = new Comment("originalAuthor", "originalComment");

        logger.info(commentService.publishComment(comment));

        commentService.doSomethingWithComment(comment);
    }
}
