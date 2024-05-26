package org.practice.service;

import org.practice.config.ToLog;
import org.practice.config.ToSecure;
import org.practice.model.Comment;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class CommentService {
    private final Logger logger = Logger.getLogger(CommentService.class.getName());

    public String publishComment(Comment comment) {
        this.logger.info(String.format("Author: %s; Comment: %s;", comment.author(), comment.text()));

        return "success";
    }

    @ToLog
    @ToSecure
    public void doSomethingWithComment(Comment comment) throws Exception {
        logger.info(String.format("I did something with comment: %s; %s;", comment.author(), comment.text()));
    }
}
